import {ListItem} from "../ListItem";
import React from "react";
import {useDispatch, useState} from "../../../reducers/hooks";

export function DownloadButton()
{
    const state =useState()
    const dispatch = useDispatch()

    async function handleClick (){
    // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
        const array = ['<q id="a"><span id="b">hey!</span></q>']; // an array consisting of a single string
        const blob = new Blob(array, { type: "text/html" }); // the blob
    const supportsFileSystemAccess =
        'showSaveFilePicker' in window &&
        (() => {
            try {
                return window.self === window.top;
            } catch {
                return false;
            }
        })();
    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
        try {
            // Show the file save dialog.
            const handle = await window.showSaveFilePicker({
                suggestedName: "test"
            });
            // Write the blob to the file.
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err: any) {
            // Fail silently if the user has simply canceled the dialog.
            if (err.name !== 'AbortError') {
                console.error(err.name, err.message);
                return;
            }
        }
    }
    // Fallback if the File System Access API is not supported…
    // Create the blob URL.
    const blobURL = URL.createObjectURL(blob);
    // Create the `<a download>` element and append it invisibly.
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = "test";
    a.style.display = 'none';
    document.body.append(a);
    // Programmatically click the element.
    a.click();
    // Revoke the blob URL and remove the element.
    setTimeout(() => {
        URL.revokeObjectURL(blobURL);
        a.remove();
    }, 1000);
};
    return (

            <ListItem text={"Download Notes"}
                      iconOnly={state.LabelPanelClosed}
                onClick={handleClick}
                      icon={<span className="material-symbols-outlined">
download
</span>}

            ></ListItem>

    )
}