
function showValue(){
  let submit = document.getElementById('submit');
  console.log(submit);

  submit.addEventListener('click', (event) => {
          event.preventDefault();
      let form = document.querySelector('.js-form') 
      console.log(form.name.value);
      console.log(form.birthdate.value);  
         
      })
}

showValue()


