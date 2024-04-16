const TimeFormat = (props : {time : string}) => {

    let timeNow = new Date(414423564)

    let hours = timeNow.getHours().toString()
    let minutes = timeNow.getMinutes().toString()
    let  seconds = timeNow.getSeconds().toString()


    hours = hours.length == 1 ? "0"+hours : hours
    minutes = minutes.length == 1 ? "0"+minutes : minutes
    seconds = seconds.length == 1 ? "0"+seconds : seconds
     
    

    return (
        <div 
            className="border rounded-3xl px-4"
            style={{width :"fit-content" , color: "#1B9AD1" , borderColor:"#1B9AD1"}}
        >
            {props.time}
        </div>
    )
}

export default TimeFormat
