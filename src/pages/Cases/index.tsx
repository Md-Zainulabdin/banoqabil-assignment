// import AgentsList from '@/components/AgentsList'
import CustomList from '@/components/CustomList'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyCases = () => {
	return (
		<div>
			<div className="px-1 pt-4 pb-3">
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="font-weight-bold mb-0">All Applications</h3>
					<Link to="/pages/applications/new">
						<Button>Create Application</Button>
					</Link>
				</div>
			</div>
			{/* <AgentsList /> */}
			<CustomList />
		</div>
	)
}

export default MyCases
