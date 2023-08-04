


function spawnNewInput():[HTMLInputElement, ()=>any]
{
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    document.body.append(input);

    function unmount()
    {
        document.body.removeChild(input);
    }

    return [input, unmount]
}

/**
 * inspired by:
 * https://stackoverflow.com/questions/38252194/how-can-i-convert-an-onload-promise-into-async-await
 */
async function getParsedObject()
{



    const [input, unmountInput] = spawnNewInput();
    const reader = new FileReader();


    return new Promise<object>((resolve, reject)=>{
        console.log(`input click! `)
        input.onchange = function( me:any)
        {

            if(!input.files)
            {
                console.error(" 'files' property does not exist on input element ")
                return;
            }

            debugger;

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

        input.click();

        reader.onload = (e)=>{
            if (typeof reader.result !== "string") {
                alert(" There's something wrong with the file you uploaded :( ")
                return;
            }

            console.log(`reader loaded ! `)
            const obj = JSON.parse(reader.result);

            unmountInput();
            resolve(obj);
        }
    })
}



export function useUpload()
{
    return ()=>{

        return getParsedObject();

    }
}




