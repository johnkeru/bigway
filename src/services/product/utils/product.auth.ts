
export function productAuth(name:string){
    if(!name) return {
        field: 'name',
        msg: 'name is required'
    }
    if(name.length < 3) return {
        field: 'name',
        msg: 'name must be at least 3 characters'
    }
    return{
        field: '',
        msg: ''
    }
}