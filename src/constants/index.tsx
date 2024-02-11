export const baseUrl = `https://crm.internationaleducationoffice.co.uk`
export const formBaseUrl = `https://crm.internationaleducationoffice.co.uk/core-settings`

interface ColumnData {
	Header: string
	accessor: string | ((_: any, index: number) => number)
	disableSortBy?: boolean
	defaultCanSort?: boolean
	Cell?: ({ value }: { value: string }) => JSX.Element
}

export const modalColumns: ColumnData[] = [
	{
		Header: 'Address',
		accessor: 'address',
		defaultCanSort: false,
	},

	{
		Header: 'Phone No',
		accessor: 'phoneNo',
		defaultCanSort: false,
	},

	{
		Header: 'CGPA',
		accessor: 'studentId.CGPA',
		defaultCanSort: false,
	},
]
