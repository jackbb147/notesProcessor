

async function read(input: HTMLElement)
{
    //     TODO

    input.click();
}




export function useUpload()
{
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    document.body.append(input);
    return ()=>{
        read(input)
    }
}