import { EVENTS } from './const.js'
export function navigate(path){
    window.history.pushState({}, path, window.location.origin + path)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
  }
export function Link({target,to,...props}){
    const handleClick = (event)=>{
        const isMainEvent = event.button === 0 
        const isModifiedEvent = (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
        const isManageableEvent = target === undefined || target === null || target === '_self'
       
        if(isMainEvent && !isModifiedEvent && isManageableEvent){
        event.preventDefault();
            navigate(to)
        }
    }
return(
    <a onClick={handleClick} href={to} target={target} {...props}></a>
)
}
  