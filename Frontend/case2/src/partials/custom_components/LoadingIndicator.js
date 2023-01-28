import spinner from '../../assets/images/spinner.gif'
export default function LoadingIndicator({style}){
    return(
        <img style={style} src={spinner} alt="  "/>
    )
}