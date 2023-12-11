import {Link} from '../Link'
const i18n = {
  en: {
    title: 'About page'
  },
  es: {
    title: 'Acerca de'
  },
}
const useLang = (lang) =>{
  return i18n[lang] || i18n['en']
}
export default function About({routeParams}){
  const i18n = useLang(routeParams.lang ?? 'en')
    return( <>
       <h1>{i18n.title}</h1>
       <p></p>
       <Link to="/">ir al home</Link>
     </>
    )
   }