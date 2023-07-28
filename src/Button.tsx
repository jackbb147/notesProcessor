export function Button({icon, rootClassName}: {icon?:string, rootClassName?:string})
{
    return <div className={"w-6 ml-1 cursor-default "+rootClassName}><img src={icon}/></div>
}