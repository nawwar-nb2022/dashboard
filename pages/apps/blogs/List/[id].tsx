
import { useRouter } from "next/router"

const ListID = () => {
    const {query} = useRouter()
    return (
        <div>
            {query.id}
        </div>
    )
}

export default ListID
