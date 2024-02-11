import { useAuthContext } from '@/common'
import { useGetAgentByIdQuery } from '@/redux/api/AgentsApi'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Column } from 'react-table'
import { Table } from '..'

interface LogsData {
	name: string
	type: string
	date: string
	description: string
}

interface Date {
	date: string
	month: string
	year: string
}

const columns: ReadonlyArray<Column> = [
	{
		Header: 'S.No.',
		accessor: (_: any, index: number) => index + 1,
		disableSortBy: true,
	},
	{
		Header: 'User',
		accessor: 'member.username',
		defaultCanSort: true,
	},
  {
		Header: 'Role',
		accessor: 'member.role.name',
		defaultCanSort: true,
	},
	{
		Header: 'Type',
		accessor: 'type',
		defaultCanSort: true,
	},
]

const Logs = () => {
	const { id } = useParams()
	const { user } = useAuthContext()

	const { data, isLoading, isError, isSuccess } = useGetAgentByIdQuery({
		userId: id,
		token: user.token,
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Something went wrong!</div>
	}
	return (
		<div>
			<h4 className="px-2 mb-2">Logs</h4>
			{isLoading && <div>Loading...</div>}
			{isSuccess && (
				<Row>
					<Col>
						<Card>
							<Card.Body>
								<Table<LogsData>
									columns={columns}
									data={data?.logs || []}
									pageSize={5}
									isSortable={true}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default Logs
