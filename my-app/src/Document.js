import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Document extends Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            documents: [],
            modalTitle: "",
            DocumentId: 0,
            DocumentName: "",
            Department: "",
            InsertedOn: "",
            DocFileName: "anonymous.pdf",
            PhotoPath: variables.FILE_URL,

            DocumentIdFilter: "",
            DocumentNameFilter: "",
            documentsWithoutFilter: []
        }
    }
    FilterFn() {
        var DocumentIdFilter = this.state.DocumentIdFilter;
        var DocumentNameFilter = this.state.DocumentNameFilter;

        var filteredData = this.state.documentsWithoutFilter.filter(
            function (el) {
                return el.DocumentId.toString().toLowerCase().includes(
                    DocumentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DocumentName.toString().toLowerCase().includes(
                        DocumentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ documents: filteredData });

    }

    sortResult(prop, asc) {
        var sortedData = this.state.documentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ documents: sortedData });
    }

    changeDocumentIdFilter = (e) => {
        this.state.DocumentIdFilter = e.target.value;
        this.FilterFn();
    }
    changeDocumentNameFilter = (e) => {
        this.state.DocumentNameFilter = e.target.value;
        this.FilterFn();
    }
    refreshList() {

        fetch(variables.API_URL + 'document')
            .then(response => response.json())
            .then(data => {
                this.setState({ documents: data, documentsWithoutFilter: data });
            });

        fetch(variables.API_URL + 'department')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDocumentName = (e) => {
        this.setState({ DocumentName: e.target.value });
    }
    changeDepartment = (e) => {
        this.setState({ Department: e.target.value });
    }
    changeInsertedOn = (e) => {
        this.setState({ InsertedOn: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Document",
            DocumentId: 0,
            DocumentName: "",
            Department: "",
            InsertedOn: "",
            DocFileName: "anonymous.pdf"
        });
    }
    editClick(doc) {
        this.setState({
            modalTitle: "Edit Document",
            DocumentId: doc.DocumentId,
            DocumentName: doc.DocumentName,
            Department: doc.Department,
            InsertedOn: doc.InsertedOn,
            DocFileName: doc.DocFileName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'document', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DocumentName: this.state.DocumentName,
                Department: this.state.Department,
                InsertedOn: this.state.InsertedOn,
                DocFileName: this.state.DocFileName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'document', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DocumentId: this.state.DocumentId,
                DocumentName: this.state.DocumentName,
                Department: this.state.Department,
                InsertedOn: this.state.InsertedOn,
                DocFileName: this.state.DocFileName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'document/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    fileUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'document/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ DocFileName: data });
            })
    }

    render() {
        const {
            departments,
            documents,
            modalTitle,
            DocumentId,
            DocumentName,
            Department,
            InsertedOn,
            PhotoPath,
            DocFileName
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Upload Document
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeDocumentIdFilter}
                                        placeholder="Filter" />
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Document Id
                            </th>
                            <th>
                                Document Name
                            </th>
                            <th>
                            <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeDocumentNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>

                                File Name
                            </th>
                            <th>

                                Department
                            </th>
                            <th>
                                Inserted on
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(doc =>
                            <tr key={doc.DocumentId}>
                                <td>{doc.DocumentId}</td>
                                <td>{doc.DocumentName}</td>
                                <td>{doc.DocFileName}</td>
                                <td>{doc.Department}</td>
                                <td>{doc.InsertedOn}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(doc)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(doc.DocumentId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Document Name</span>
                                            <input type="text" className="form-control"
                                                value={DocumentName}
                                                onChange={this.changeDocumentName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select"
                                                onChange={this.changeDepartment}
                                                value={Department}>
                                                {departments.map(dep => <option key={dep.DepartmentId}>
                                                    {dep.DepartmentName}
                                                </option>)}
                                            </select>
                                        </div>




                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img
                                            src={PhotoPath + DocFileName} />
                                        <input className="m-2" type="file" accept=".pdf,.docx/*" onChange={this.fileUpload} />
                                    </div>
                                </div>

                                {DocumentId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {DocumentId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}