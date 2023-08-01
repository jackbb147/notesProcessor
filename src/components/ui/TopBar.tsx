import {AddNodeButton} from "../AddNodeButton";
import React from "react";

export function TopBar({children}:{children: React.ReactNode})
{
    return <div className={"top-bar h-12 flex items-center justify-between"}>{children}</div>
}