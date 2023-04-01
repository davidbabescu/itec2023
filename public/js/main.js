function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value; 
    const size = document.querySelector('#size').value; 
    
    if(prompt === '') {
        alert('Please add some text');
        return; 
    }

    console.log('success');
    generateImageRequest(prompt,size);
}

async function generateImageRequest(prompt,size){
    try {
        showLoading(); 

        const response= await fetch('/openai/generateimage',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if(!response.ok){
            removeLoading();
            throw new Error ('That image cold not be generated');
        }

      const data = await response.json();
      //console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src =imageUrl;

      removeLoading();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showLoading(){
    document.querySelector('.loading').classList.add('show');
}
function removeLoading(){
    document.querySelector('.loading').classList.remove('show');
}


document.querySelector('#image-form').addEventListener('submit', onSubmit );