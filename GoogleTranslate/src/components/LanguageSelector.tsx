import {Form} from 'react-bootstrap'
import { AUTO_LENGUAGE, SUPPORTED_LENGUAGES } from '../constants'
import {type FunctionComponent} from 'react'
import { FromLenguage, Language, SectionType } from '../types.d'

type Props = 
   | {type: SectionType.From, value: FromLenguage, onChange: (value: FromLenguage)=>void}
   | {type: SectionType.To, value: Language, onChange: (value: Language)=>void}


export const LanguageSelector: FunctionComponent<Props>=({onChange, type, value})=>{
    const handleChange=(event : React.ChangeEvent<HTMLSelectElement>) =>{
        onChange(event.target.value as Language)
    }
    return(
        <div>
           <Form.Select aria-label='Select the language' onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LENGUAGE}>Detect language</option>}
                {  Object.entries(SUPPORTED_LENGUAGES).map(([key,literal])=>(
                    <option key={key} value={key}>{literal}</option>
                ))
            }
           </Form.Select>
        </div>
    )
}