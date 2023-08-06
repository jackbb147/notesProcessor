


import React from "react";
import {Desktop, Mobile, Tablet} from "../../../hooks/useMediaQuery";
import {Desktop_FolderPanel} from "./Desktop_FolderPanel";
import {Tablet_FolderPanel} from "./Tablet_FolderPanel";
import {Mobile_FolderPanel} from "./Mobile_FolderPanel";
export function FolderPanel({children}:{children: React.ReactNode})
{
    return (
        <>
            <Desktop>
                <Desktop_FolderPanel>
                    {children}
                </Desktop_FolderPanel>
            </Desktop>

            <Tablet>
                <Tablet_FolderPanel>
                    {children}
                </Tablet_FolderPanel>
            </Tablet>

            <Mobile>
                <Mobile_FolderPanel>
                    {children}
                </Mobile_FolderPanel>
            </Mobile>
        </>



    )
}