
const loading = <div className='center-items'>Loading...</div>

function loader(input) {
    return input ? input : loading
}

export {
    loader,
    loading
}