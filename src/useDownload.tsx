
async function download(suggestedName="my notes",data:string )
{

    /**
     * all credit belongs to:
     * https://web.dev/patterns/files/save-a-file/
     */

        // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
    const array = [data]; // an array consisting of a single string
    const blob = new Blob(array, { type: "text/json" }); // the blob

    suggestedName += ".txt";
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
                suggestedName: suggestedName
            });
            // Write the blob to the file.
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err: any) {
            // Fail silently if the user has simply canceled the dialog.
            if (err.name == 'AbortError') {
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
    a.download = suggestedName;
    a.style.display = 'none';
    document.body.append(a);
    // Programmatically click the element.
    a.click();
    // Revoke the blob URL and remove the element.
    setTimeout(() => {
        URL.revokeObjectURL(blobURL);
        a.remove();
    }, 1000);
}

export function useDownload()
{
    return download;
}