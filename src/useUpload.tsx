

async function read(input: HTMLElement)
{
    //     TODO

    input.click();

}

function handleInputChange(this: any)
{

    if(!this || !this.files)
    {
        console.error("input element corrupted. ")
        return;
    }

    const reader = new FileReader();
    reader.onload = (e)=>{

        if (typeof reader.result !== "string") {
            alert(" There's something wrong with the file you uploaded :( ")
            return;
        }

        const obj = JSON.parse(reader.result);
        debugger;

    }

    reader.readAsText(this.files[0]);
}



export function useUpload()
{
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    input.onchange = handleInputChange;
    document.body.append(input);
    return ()=>{
        read(input)
    }
}




