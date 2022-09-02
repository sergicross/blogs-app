import '../index.css'

const Notification = (params) => {
        // eslint-disable-next-line no-lone-blocks
        {
            if((params.error)&&(params.verify === null)){
                return (<div className='error'>
                            {params.error}
                        </div>)
            } else if ((params.error === null)&&(params.verify)){
                return (<div className='verify'>
                    {params.verify}
                </div>)
            } else{
                return (<></>)
            }
        }
}

export default Notification