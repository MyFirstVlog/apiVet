module.exports = {
        mascotas: [
    {kind:'Dog', name:'alejo1', owner:'diana0'},
    {kind:'Dog', name:'alejo2', owner:'diana1'},
    {kind:'Dog', name:'alejo3', owner:'diana2'},
    {kind:'Dog', name:'alejo4', owner:'diana3'},
    {kind:'Dog', name:'alejo5', owner:'diana4'},
],
        vets: [
    {name:'Alejandro', lName:'Estrada', id:'102312', country:'Netherlands'},
    {name:'Alex', lName:'Leal', id:'3423',country:'Colombia'},
    {name:'Caro', lName:'Bedoya', id:'1032422312', country:'Costa Rica'},
    {name:'Diana', lName:'Moscoso', id:'1024234312', country:'USA'},
        
],
        owners: [
    {name:'Ana', lName:'Ciro', id:'102312',country:'Netherlands' },
    {name:'Cristiano', lName:'Ronaldo', id:'3423',country:'Colombia'},
    {name:'Neymar', lName:'Jr', id:'1032422312',country:'Costa Rica'},
    {name:'Kylian', lName:'Mbappé', id:'1024234312',  country:'USA'},
        
],

    consults: [
        {pet:0, vet: 0,dateCreation:new Date(), dateEdition: new Date(),historia:'Diabetes',diagnosis:'Liver'},
        {pet:1, vet: 1,dateCreation:new Date(), dateEdition: new Date(),historia:'Insuline Dependancy',diagnosis:'Lung'},
        {pet:2, vet: 2,dateCreation:new Date(), dateEdition: new Date(),historia:'Heart Disease',diagnosis:'Brain'},
    ]
}