const containerDays = document.getElementById('container-days');
const containerAlerts = document.getElementById('container-alerts');
const containerHabits = document.getElementById('container-habits');

const mainContainer = document.getElementById('main-container');

const btnCreateHabit = document.getElementById('btn-create-habit');

const modals = document.querySelectorAll('.modal');

var habits = [];
var habitDays = [];
var habitAlertsArray = [];

var currentHabitSelected;

const stateHabit = [
    { id : 1 , name : 'active'},
    { id : 2 , name: 'inactive' },
    { id : 3 , name: 'rest' },
    { id : 4 , name: 'avandoned' }
];

const typeHabit = [
    { id: 1, name: 'fisico' },
    { id: 2, name: 'estudio' }
];

const stateDayHabit = [
    { id: 1, name: 'none' },
    { id: 2, name: 'grade1' },
    { id: 3, name: 'grade2' },
    { id: 4, name: 'grade3' }
];

class habit {

    idHabit = 0;
    idStateHabit = 0;
    idTypeHabit = 0;
    nameHabit = '';
    description = '';

    getTypeHabit(id,containerData){
        for (let i = 0; i < containerData.length; i++) {
            if (containerData[i].id === id){
                return containerData[i].name;
            }
        }
    }

    getStateHabit(id,containerData){
        for (let i = 0; i < containerData.length ; i++){
            if (containerData[i].id === id) {
                return containerData[i].name;
            }
        }
    }


    render(){
        return `
        <div class ="habit-card mb-1" data-id-card="${this.idHabit}" >
                <div class ="habit-card-information">
                    <h3 class="habit-name">${this.nameHabit}</h3>
                    <span class = "habit-type">${this.getTypeHabit(this.idHabit,typeHabit)}</span>
                    <span class = "state-habit">${this.getStateHabit(this.idHabit,stateHabit)}</span>
                    <p class="habit-description">${this.description}</p>
                </div>
                <div class ="habit-card-actions" data-id-card="${this.idHabit}" >
                    <button data-modal-name = "modal-add-tracking" class = "btn-add-tracker btn btn-primary"> add tacker </button>
                    <button data-modal-name = "modal-edit-habit" class = "btn-edit btn btn-primary"> edit</button>
                    <button class = "btn-delete btn btn-danger"> delete</button>
                </div>
            </div>
        `
    }

    constructor(idHabit,idStateHabit,idTypeHabit,nameHabit,description){
        this.idHabit = idHabit;
        this.idStateHabit = idStateHabit;
        this.idTypeHabit = idTypeHabit;
        this.nameHabit = nameHabit;
        this.description = description;
    }
}

class habitAlerts{

    alerts = [];
    idHabit = 0;

    createAlert(idTraker,idHabit,dateHabit,idStateDay,description){
        return {
            idTraker,
            idHabit,
            dateHabit,
            idStateDay,
            description
        }
    }

    addAlert(){

    }

    deleteAlert(){

    }

    render(){

    }

    constructor(idHabit){
        this.idHabit = idHabit;
    }
}


function listenerComponentCardHabit(){

    const cards = document.querySelectorAll('.habit-card-actions');

    const addTacker = () => {

    }
    const editHabit = () => {

    }
    const deleteHabit = () => {

    }

    cards.forEach(card => {
        const buttons = card.childNodes;

        buttons.forEach(button => {

            if (button.tagName === 'BUTTON'){

                if (button.classList.contains('btn-add-tracker')){
                    let modalName = button.dataset.modalName;
                    button.addEventListener('click', (event) => {
                        openModalById(modalName, () => {
                            console.log('it works');
                        })
                    })
                    return
                }
                if (button.classList.contains('btn-edit')) {
                    let modalName = button.dataset.modalName;
                    button.addEventListener('click',(event)=>{
                        openModalById(modalName, () => {
                            console.log('it works');
                        })
                    })
                    return
                }
                if (button.classList.contains('btn-delete')) {

                    return
                }

            }
        })    
    })
}

function renderComponentCardHabits(){
    var habitString = '';
    habits.forEach(habit => {
        habitString = habitString + habit.render();
    })
    containerHabits.innerHTML = habitString;
}

function renderAlerts(){

}

function renderDays(){

}

const createHabitAction = (event) => {

    const nameIdModal = event.target.dataset.modalName;

    openModalById(nameIdModal, () => {
        const createHabit = () => {
            return new habit(1,1,1,'test name','description test')
        }
        habits.push(createHabit())
        
    })

    event.preventDefault();
}

function listeners(){
    btnCreateHabit.addEventListener('click',createHabitAction)
}

function app(){

    renderDays();
    renderAlerts();
    renderComponentCardHabits();

    listenerComponentCardHabit();

    listeners();
}

app();

/* modal actions */

function openModalById (modalName,callback) {

    modals.forEach(modal => {

        if (modalName === modal.id ){
            
            modal.classList.add('modal-open');
            mainContainer.style.filter = "blur(1px)";

            // add listeners to the actions button
            modal.childNodes.forEach(div => {

                if (div.tagName === 'DIV'){

                    if (div.classList.contains('modal-footer')) {

                        const buttons = div.childNodes;
                        buttons.forEach(button => {
                            if (button.tagName === 'BUTTON') {

                                // actions in close button
                                if (button.classList.contains('btn-cancel')) {
                                    button.addEventListener('click',(event)=>{

                                        //styles for close modal
                                        modal.classList.remove('modal-open');
                                        mainContainer.style.filter = "blur(0)";

                                    })
                                }

                                // actions for the modal
                                if (button.classList.contains('btn-action')){

                                    button.addEventListener('click',(event)=>{

                                        console.log('actions for clicked');

                                        //styles for close modal
                                        modal.classList.remove('modal-open');
                                        mainContainer.style.filter = "blur(0)";

                                        renderComponentCardHabits();
                                        listenerComponentCardHabit();

                                    })
                                }
                            }
                        })
                    }
                }
            })

            callback();

        }
    })
}