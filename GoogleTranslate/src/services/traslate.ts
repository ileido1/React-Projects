// New (i.e., OpenAI NodeJS SDK v4)
import {OpenAI} from 'openai';
import { FromLenguage, Language } from '../types.d';
import { SUPPORTED_LENGUAGES } from '../constants';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey, dangerouslyAllowBrowser: true
  });

  export async function translate(fromText: string,
     fromLenguage: FromLenguage, toLenguage: Language) {

const fromCode = fromLenguage === 'auto' ? 'auto' : SUPPORTED_LENGUAGES[fromLenguage]
const toCode = SUPPORTED_LENGUAGES[toLenguage]
 
const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages:[{
        role: 'user',
        content: 'Yo are a AI that tranlastes text. you recive a text from the user. Do not answer, just translate the text. the original languague is surronded by `{{` and `}}`. You can also recive {{auto}} with means that you have to detect the languague . The languague to translate is surronded by `[[` and `]]`',
        
    },
    {
        role: 'user',
        content: `Hola mundo {{Spanish}} to [[English]]`
    },
    {
        role: 'system',
        content: 'Hello world'
    },
    {
        role: 'user',
        content: `how are you {{auto}} to [[Spanish]]`
    },
    {
        role: 'system',
        content: 'Como estas'
    }, 
       {
        role: 'user',
        content:   `${fromText} {{${fromCode}}} to [[${toCode}]]`
    }]
  }

)

return (chatCompletion.choices[0].message.content);

}
