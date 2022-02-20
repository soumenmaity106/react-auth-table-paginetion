import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import UserDataService from "../services/userService";
import { useTable } from "react-table";

const UserlsList = (props) => {
	const [users, setUsers] = useState([]);
	const [searchTitle, setSearchTitle] = useState("");
	const userRef = useRef();

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(3);

	const pageSizes = [3, 6, 9];

	userRef.current = users;

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const getRequestParams = (searchTitle, page, pageSize) => {
		let params = {};

		if (searchTitle) {
			params["first_name"] = searchTitle;
		}

		if (page) {
			params["page"] = page - 1;
		}

		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	const retrieveuseList = () => {
		const params = getRequestParams(searchTitle, page, pageSize);

		UserDataService.getAll(params)
			.then((response) => {
				const { userdata, totalPages } = response.data;

				setUsers(userdata);
				setCount(totalPages);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(retrieveuseList, [page, pageSize]);

	const findByTitle = () => {
		setPage(1);
		retrieveuseList();
	};

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handlePageSizeChange = (event) => {
		setPageSize(event.target.value);
		setPage(1);
	};

	const columns = useMemo(
		() => [
			{
				Header: "First Name",
				accessor: "first_name",
			},
			{
				Header: "Last Name",
				accessor: "last_name",
			},
			{
				Header: "Email",
				accessor: "email",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data: users,
		});

	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by Name"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByTitle}
						>
							Search
						</button>
					</div>
				</div>
			</div>

			<div className="col-md-12 list">
				<div className="mt-3">
					{"Items per Page: "}
					<select onChange={handlePageSizeChange} value={pageSize}>
						{pageSizes.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>

					<Pagination
						className="my-3"
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</div>

				<table
					className="table table-striped table-bordered"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserlsList;
