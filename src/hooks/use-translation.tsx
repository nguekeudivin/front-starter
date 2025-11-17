import fr from '@/config/i18/fr';
//import { usePage } from '@inertiajs/react';

export const translate = (key: string, lang: string = "en") => {
  if (lang === "en") return key;
  if (fr.hasOwnProperty(key)) return fr[key];
  else return key;
};

export default function useTranslation() {
    //const { auth, lang } = usePage<any>().props; 
    const lang = "en"

    return {
    t: (key: string) => {
      return translate(key, lang);
    },
  };
}


