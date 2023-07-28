export function Button({icon, rootClassName}: {icon?:string, rootClassName?:string})
{
    return <div className={"ml-1 cursor-default "+rootClassName}><img className={"w-6 h-6 "} src={icon}/></div>
}