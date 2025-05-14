import axios from "axios";
import { getSlugFromTitle, getFormattedDate } from "../../assets/utils/HelpUtils";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const categories = ["AI", "IT", "Tech", "Cybersecurity", "Government", "Ecommerce"];

const getImageFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
};


const uploadImage = async (imageFile) => {
const formData = new FormData();
formData.append("files", imageFile);

try {
    const response = await axios.post(`${backendUrl}api/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const imageId = response.data[0].id;
    return imageId;
} catch (error) {
    console.error("Error uploading image to Strapi:", error);
    throw error;
}
};
export async function generateAndPostNews() {
    try {
        const category = categories[Math.floor(Math.random()*6)]
        const resultRes = await fetch(`http://localhost:5600/generate-article?category=${encodeURIComponent(category)}`);
        const result = await resultRes.json();

        // const result = {
        //     title: "Amazon Expands its Ecommerce Footprint in Emerging Markets",
        //     bodyText: "Amazon, the world’s leading ecommerce giant, is making significant strides in extending its presence in emerging markets. The company announced yesterday an investment of $1 billion in new infrastructure developments, aiming at enhancing its logistics network in Southeast Asia, Africa, and South America. This is seen as a strategic move to tap into the burgeoning ecommerce potential in these rapidly evolving markets. The investment aims to enhance Amazon's delivery and storage capabilities, ensuring faster delivery times and a wider range of products. Analysts believe this move will not only boost Amazon’s revenue but also increase its share in the global ecommerce market, which is expected to reach $4.89 trillion by 2021, according to eMarketer. However, this expansion is not without challenges. Amazon will need to navigate diverse cultural, legal, and business landscapes in these regions. Despite these obstacles, Amazon's commitment to expanding its ecommerce footprint globally is clear and, given its track record, the company is more than capable of overcoming these challenges.",
        //     timeToRead:3,
        //     translatedTitle: "Ամազոնը ընդլայնում է իր էլեկտրոնային առևտրի հատվածը զարգացող շուկաներում",
        //     translatedBodyText: "Ամազոնը, աշխարհի առաջնության էլեկտրոնային առևտրի գիգանտը, արագընթաց արձակներ է կատարում իր ներկայությունը ընդլայնելու զարգացող շուկաների ուղղությամբ: Ընկերությունը երեկոյան հայտարարեց $1 մլրդ. դոլար նոր ուսուցիչական զարգացման մասին, նպատակայացված իր լոգիստիկական ցանցը բարելավելու Հարավային Ասիայում, Աֆրիկայում և Հարավային Ամերիկայում: Սա համարվում է ստրատեգիական քայլ այս արագ զարգացող շուկաների էլեկտրոնային առևտրի հասնալու համար: Նախաձեռնությունը հավըլի արագ առաքման ժամանակներ և ավելի լայն ապրանքատեսականի ապահովումը: Անալիտիկները համարում են, որ այս քայլը ոչ միայն կվերացմանի Ամազոնի եկամտային արժեքը, այլ նաև կավելացնի իր բաժինը համաշխարհային էլեկտրոնային առևտրի շուկայում, որը սպասվում է հասնել միայն $4.89 տրլն. 2021թ. ըստ eMarketer-ի: Իսկ այս ընդլայնումը չի առանց մարտահրավերների: Ամազոնին պետք է հասկանալ այս շրջանների տարբերազանց մշակույթային, օրենսգրության և բիզնես մանրամասները: Այնուամենայնիվ, Ամազոնի համաձայնությունը իր էլեկտրոնային առևտրի հատվածը աշխարհում ընդլայնելու համար ակնհայտ է, և հաշվի առնելով իր պատմությունը, ընկերությունը ավելի քան կարող է այս բարերները աշխատել:",
        //     imagePrompt: "A globe overlaid with Amazon logo and packages, symbolizing Amazon's Ecommerce expansion.",
        //     imageALT: "Globe with Amazon logo and packages.",
        // }

        if (!result.title || !result.bodyText || !result.imagePrompt) {
            throw new Error("Missing required data from news generator");
        }

        console.log(result,'resultttttt');



        const slug = getSlugFromTitle(result?.title);
        const timeToRead = result?.timeToRead;

        const res = await fetch(`http://localhost:5600/proxy-image?prompt=${encodeURIComponent(result.imagePrompt)}`);
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        const imageFile = await getImageFile(imageUrl, result.imageALT,"image/png")
        const imageId = await uploadImage(imageFile)

        // Generate the news article with the image ID
        const generatedNews = async (title, text) => ({
                title,
                slug: slug,
                postedDate: getFormattedDate(new Date()),
                category: category,
                timeToRead: timeToRead,
                image: imageId,
                publishedAt: new Date().toISOString(),
                bodyText: [
                    {
                      type: "paragraph",
                      children: [
                        { type: "text", text: text }
                      ]
                    }
                ]
        });


        // Generate news data
        const enNews = await generatedNews(
            result.title,
            result.bodyText
        );

        // Send it to Strapi
        const enResponse = await axios.post(`${backendUrl}api/newses`, { data: enNews }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Successfully posted to Strapi: En", enResponse.data);

        const hyNews = await generatedNews(
            result.translatedTitle,
            result.translatedBodyText
        );

        const hyResponse = await axios.post(`${backendUrl}api/newses?locale=hy`,{
            data: {
                ...hyNews,
                // documentId: enResponse.data.data.documentId,
                locale:"hy",
                slug:enResponse.data.data.slug,
            }
        })
        console.log("✅ Successfully posted to Strapi: Hy", hyResponse.data);
        
    } catch (err) {
        console.error("Error posting to Strapi:", err);
    }
}
