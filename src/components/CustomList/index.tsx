import { useAuthContext } from '@/common'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const CustomList = () => {
	const { user } = useAuthContext()

	const [tableHead, setTableHead] = useState([])
	const [tableBody, setTableBody] = useState([])
	const [data, setData] = useState([])

	const [currentPage, setCurrentPage] = useState(1)
	const recordsPerPage = 5
	const lastIndex = currentPage * recordsPerPage
	const firstIndex = lastIndex - recordsPerPage
	const records = tableBody?.slice(firstIndex, lastIndex)

	const nPage = Math.ceil(tableBody.length / recordsPerPage)
	const numbers = [...Array(nPage + 1).keys()].slice(1)

	const prePage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1)
		}
	}
	const nextPage = () => {
		if (currentPage !== lastIndex) {
			setCurrentPage(currentPage + 1)
		}
	}
	const changePage = (num: number) => {
		setCurrentPage(num)
	}

	useEffect(() => {
		axios
			.get(
				`https://crm.internationaleducationoffice.co.uk/applications/grid_keys`,
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
					},
				}
			)
			.then((res) => {
				setTableHead(res.data as any)
			})
			.catch((err) => console.log(err))
		axios
			.get(
				`https://crm.internationaleducationoffice.co.uk/applications/current_desk/${user._id} `,
				{
					headers: {
						Authorization: `Bearer ${user?.token}`,
					},
				}
			)
			.then((res) => {
				setTableBody(res.data as any)
				setData(res.data as any)
			})
			.catch((err) => console.log(err))
	}, [])

	const searchHandler = (e: any) => {
		const newRecords = tableBody.filter((row: any) => {
			return row.firstname.toLowerCase().includes(e.target.value.toLowerCase())
		})

		if (e.target.value !== '') {
			setTableBody(newRecords)
		} else {
			setTableBody(data)
		}
	}

	return (
		<div>
			<div>
				<input type="text" placeholder={'Search'} onChange={searchHandler} />
			</div>
			<Table hover responsive className="table-nowrap mb-0">
				<thead>
					<tr>
						<th>S No</th>
						{tableHead.map((th: any, idx) => (
							<th key={idx}>{th?.label}</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{records.map((td: any, idx) => {
						return (
							<tr key={idx}>
								<td>{idx + 1}</td>
								{tableHead.map((row: any, rowIdx) => {
									let value = '-'
									for (let key in td) {
										if (key === row.key && typeof td[key] === 'string') {
											value = td[key]
											break
										}
									}
									return <td key={rowIdx}>{value}</td>
								})}
								<td>...</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

			<div className="pagination mt-4 px-2">
				<div className="d-flex align-items-center gap-2 list-style-none">
					<span onClick={prePage}>Prev</span>
					{numbers.map((num: any, idx: number) => (
						<span key={idx} onClick={() => changePage(num)}>
							{num}
						</span>
					))}
					<span onClick={nextPage}>Next</span>
				</div>
			</div>
		</div>
	)
}

export default CustomList
