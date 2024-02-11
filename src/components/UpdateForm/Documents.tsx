import { useAuthContext } from '@/common'
import { useGetAgentByIdQuery } from '@/redux/api/AgentsApi'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Column } from 'react-table'
import { Table } from '..'

interface DocumentData {
	name: string
	date: string
	docs: string
}

const columns: ReadonlyArray<Column> = [
	{
		Header: 'S.No.',
		accessor: (_: any, index: number) => index + 1,
		disableSortBy: true,
	},
	{
		Header: 'Name',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Date',
		accessor: 'date',
		defaultCanSort: true,
	},
	{
		Header: 'Docs',
		accessor: 'document',
		defaultCanSort: true,
		Cell: ({ value }: { value: string }) => (
			<div>
				<Link to={value}>...</Link>
			</div>
		),
	},
]

const Documents = () => {
	const { id } = useParams()
	const { user } = useAuthContext()

	const { data, isLoading, isError } = useGetAgentByIdQuery({
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
			<div>Table</div>
			<div>
				<div className="my-4">
					<h4 className='px-2 mb-2'>Additional Documents</h4>
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Table<DocumentData>
										columns={columns}
										data={data.documents || []}
										pageSize={5}
										isSortable={true}
									/>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default Documents
