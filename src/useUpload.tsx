
/**
 * inspired by:
 * https://stackoverflow.com/questions/38252194/how-can-i-convert-an-onload-promise-into-async-await
 */
async function getParsedObject(input: HTMLInputElement)
{


    const reader = new FileReader();
    input.onchange = function( me:any)
    {

        if(!input.files)
        {
            console.error(" 'files' property does not exist on input element ")
            return;
        }

        try
        {
            reader.readAsText(input.files[0]);
        }catch (err:any)
        {
            if (err.name == 'AbortError') {
                console.error(err.name, err.message);
                return;
            }
        }
    }

    return new Promise<object>((resolve, reject)=>{
        console.log(`input click! `)
        input.click();
        reader.onload = (e)=>{
            if (typeof reader.result !== "string") {
                alert(" There's something wrong with the file you uploaded :( ")
                return;
            }


            const obj = JSON.parse(reader.result);
            resolve(obj);
        }
    })
}



export function useUpload()
{
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    document.body.append(input);

    return ()=>{
        return getParsedObject(input);
    }
}




