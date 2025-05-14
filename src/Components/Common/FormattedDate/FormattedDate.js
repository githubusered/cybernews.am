import React from 'react'
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { enUS, hy} from 'date-fns/locale'
import './FormattedDate.css'

const FormattedDate = ({date, className}) => {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language === 'hy' ? hy : enUS;  // Set locale based on language
    const today = new Date();  // Current date

    // Format date using date-fns with dynamic locale
    if(date){
      const parsedDate = new Date(date);
      const formattedDate = format(parsedDate, 'dd MMM yyyy', { locale: currentLocale }); // 11 Apr 2025
      return (
        <p className={className ? `${className} dateForNews` : 'dateForNews'}>
          {formattedDate}
        </p>
      )
    }else{
      const formattedDate = format(today, "EEEE - MMMM d, yyyy", {locale: currentLocale}); // Friday - March 21, 2025

      return (
      <p className={className ? `${className} date` : 'date'}>
        {formattedDate}
      </p>
    )
    }

}

export default FormattedDate
