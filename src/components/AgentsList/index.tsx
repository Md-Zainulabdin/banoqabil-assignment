import { useAuthContext } from '@/common'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { Column } from 'react-table'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { Table } from '..'
import { useGetAgentsQuery } from '@/redux/api/AgentsApi'
import { useMemo, useState } from 'react'
import AgentModal from './AgentModal'
import { modalColumns } from '@/constants'
import { Checkbox } from 'rsuite'

interface CategoryData {
	image: string
	name: string
	last_updated_on: string
	qty: number
	trade_amount: string
	buy_amount: string
	sequence: string
}

interface ColumnData {
	Header: string
	accessor: string | ((_: any, index: number) => number)
	disableSortBy?: boolean
	defaultCanSort?: boolean
	Cell?: (cellProps: any) => JSX.Element
}

const AgentsList = () => {
	const { user } = useAuthContext()
	const [show, setShow] = useState(false)
	const [showGrid, setShowGrid] = useState(false)
	const [id, setId] = useState('')
	const [tableColumn, setTableColumn] = useState<ColumnData[]>([
		{
			Header: 'S.No.',
			accessor: (_: any, index: number) => index + 1,
			disableSortBy: true,
		},
		{
			Header: 'First Name',
			accessor: 'studentId.firstname',
			defaultCanSort: true,
		},
		{
			Header: 'Last Name',
			accessor: 'studentId.lastname',
			defaultCanSort: true,
		},
		{
			Header: 'Gender',
			accessor: 'gender',
			defaultCanSort: true,
		},
		{
			Header: 'Action',
			accessor: '_id',
			Cell: ({ value }: { value: string }) => (
				<Dropdown>
					<Dropdown.Toggle>...</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item
							onClick={() => {
								setId(value)
								setShow(!show)
							}}>
							View Profile
						</Dropdown.Item>
						<Dropdown.Item href={`/pages/application/update/${value}`}>
							Update
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			),
		},
	])

	const handleClose = () => setShowGrid(false)

	const columns: ReadonlyArray<Column> = useMemo(
		() => tableColumn,
		[tableColumn]
	)

	const { data, isLoading, error } = useGetAgentsQuery({
		userId: user._id,
		token: user.token,
	})

	const addColumns = ({
		Header,
		accessor,
		Cell,
		defaultCanSort,
		disableSortBy,
	}: ColumnData) => {
		const actionColumnIndex = tableColumn.findIndex(
			(column) => column.Header === 'Action'
		)

		if (actionColumnIndex !== -1) {
			const updatedColumns = [
				...tableColumn.slice(0, actionColumnIndex),
				{ accessor, Header, Cell, defaultCanSort, disableSortBy },
				...tableColumn.slice(actionColumnIndex),
			]

			setTableColumn(updatedColumns)
			setShowGrid(false) // Close the modal after adding the column
		}
	}

	// Error handling
	useMemo(() => {
		if (error) {
			toast.error('Something went wrong')
			console.log('dashboard', error)
		}
	}, [error])

	// Loading indicator
	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="py-2 font-semibold">
			<AgentModal show={show} onHide={() => setShow(!show)} agent_id={id} />
			<Modal show={showGrid} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Choose fields</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{modalColumns.map((item) => (
						<div key={item.Header} className="d-flex gap-1">
							<Checkbox
								// checked={selectedFields[item.value]}
								onChange={() => addColumns(item as ColumnData)}
							/>
							<span>label={item.Header}</span>
							<br />
						</div>
					))}
				</Modal.Body>
			</Modal>

			<Row>
				<Col>
					<Card>
						{/* <Card.Header className="text-end">
							<div
								className="p-2"
								style={{ cursor: 'pointer' }}
								onClick={() => setShowGrid(true)}>
								<i className="ri-layout-masonry-fill fs-22 text-primary"></i>
							</div>
						</Card.Header> */}
						<Card.Body>
							<Table<CategoryData>
								columns={columns}
								data={data || []}
								pageSize={8}
								// sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
								isSearchable={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default AgentsList
