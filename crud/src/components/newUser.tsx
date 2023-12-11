import { useUsersActions } from "../hooks/useUsersActions";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/store";
import { FormOfUser } from "./formOfUser";

export function NewUser() {
    const {addUser, updateUser,EditingUser} = useUsersActions();
    const [result,setResult] = useState<'ok' | 'ko' | null>(null);
    const useredit = useAppSelector((state) => state.options.editingUserId);
    const editingUser = useAppSelector((state) => state.users.find((user) => user.id === useredit));
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [github, setGithub] = useState('');
  
    useEffect(() => {
      setName(editingUser ? editingUser.name : '');
      setEmail(editingUser ? editingUser.email : '');
      setGithub(editingUser ? editingUser.github : '');
    }, [editingUser]);

    const handleNameChange = (newName :string) => {
        setName(newName);
      };
      
      const handleEmailChange = (newEmail:string) => {
        setEmail(newEmail);
      };
      
      const handleGithubChange = (newGithub:string) => {
        setGithub(newGithub);
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       setResult(null);
        const form = event.currentTarget;
        const formdata = new FormData(form);
        const name = formdata.get('name') as string;
        const email = formdata.get('email') as string;
        const github = formdata.get('githubUser') as string;
        if(!name || !email || !github) {
            return setResult('ko') ;
        }
        addUser({name, email, github})
        setResult('ok');
        setName('');
        setEmail('');
        setGithub('');
    }
    const handleUpdate= (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setResult(null);
        const form = event.currentTarget;
        const formdata = new FormData(form);
        const name = formdata.get('name') as string;
        const email = formdata.get('email') as string;
        const github = formdata.get('githubUser') as string;
        if(!name || !email || !github) {
            return setResult('ko') ;
        }
        updateUser({name, email, github, id:editingUser.id})
        setResult('ok');
        EditingUser('');
    }
    return (
        useredit ? (
             (
                <FormOfUser handle={handleUpdate} handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                handleGithubChange={handleGithubChange} name={name} email={email} github={github}   result={result} text={'update user'}></FormOfUser>
            )
        ):(
            <FormOfUser handle={handleSubmit} handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleGithubChange={handleGithubChange} name={name} email={email} github={github}    result={result} text={'create user'}></FormOfUser>
            
        )
    )
}