import UpdateApplicationForm from '@/components/UpdateForm'
import { useParams } from 'react-router-dom'

const UpdateApplication = () => {

	return (
		<div>
			<div className="px-1 pt-4 pb-3">
				<h3>New Application</h3>
			</div>

			<UpdateApplicationForm />
		</div>
	)
}

export default UpdateApplication
