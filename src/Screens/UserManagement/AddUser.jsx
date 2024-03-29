import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import Select from 'react-select'
import { json } from "react-router";
export const AddUser = () => {
    const [initalRole, setrole] = useState({});
    const [initialunit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [permission, setPermission] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        unit_id: [],
        user_role: ''
    });

    const userRole = [
        {
            code: 1,
            name: 'Lead'
        },
        {
            code: 2,
            name: 'Executive'
        }
    ]


    const fectchBrandData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");

        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/role-listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)
                setrole(data.roles);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }


    const fetchUnitData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom3.mystagingserver.site/mtrecords/public/api/admin/unit-listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setUnit(data.units);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }


    const handleChangeSelect = (selected) => {
        setFormData({
            ...formData, unit_id: selected
        })
    };



    const LogoutData = localStorage.getItem('login');

    const SelectOptions = []
    for (const key in initialunit) {
        if (initialunit.hasOwnProperty(key)) {
            const item = initialunit[key];

            // Create an object for each option with 'value' and 'label' properties
            const option = {
                value: item.id, // Assuming 'item.name' represents the option's value
                label: item.name, // Assuming 'item.name' also represents the option's label
            };

            // Push the option object into the SelectOptions array
            SelectOptions.push(option);
        }
    }

    console.log("GHGHGH" ,SelectOptions)


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            if(key == 'unit_id') {
                formDataMethod.append(key, JSON.stringify(formData[key]))
            } else {
                formDataMethod.append(key, formData[key]);
            }
        }
        console.log("formDataMethod", formDataMethod)
        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom3.mystagingserver.site/mtrecords/public/api/admin/user-add-edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                document.querySelector('.loaderBox').classList.add("d-none");
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };

    useEffect(() => {
        fectchBrandData()
        fetchUnitData()
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == 'user_role' && value == 2 || name == 'user_role' && value == 4) {
            setPermission(true)
        }

        if (name == 'user_role' && value == 1 || name == 'user_role' && value == 3) {
            setPermission(false)
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add User
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='User Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Email'
                                                    required
                                                    id='email'
                                                    type='email'
                                                    placeholder='Enter Email'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CustomInput
                                                    label='Password'
                                                    required
                                                    id='password'
                                                    type='password'
                                                    placeholder='Enter password'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="user_role"
                                                    label="User Role"
                                                    required
                                                    value={formData.user_role}
                                                    option={initalRole}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            {
                                                permission && (
                                                    <div className="col-md-4 mb-4">
                                                        <SelectBox
                                                            selectClass="mainInput"
                                                            name="permission"
                                                            label="Permission"
                                                            required
                                                            value={formData.permission}
                                                            option={userRole}
                                                            onChange={handleChange}
                                                        />

                                                    </div>
                                                )
                                            }
 
                                            <div className="col-md-4 mb-4">
                                                <div class="inputWrapper">
                                                    <label class="mainLabel">Add Units<span>*</span></label>
                                           
                                                    <Select
                                                        value={formData.unit_id}
                                                        isMulti
                                                        required
                                                        options={SelectOptions}
                                                        onChange={handleChangeSelect}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='Add User' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='User has been Successfully Added.' />


            </DashboardLayout>
        </>
    );
};

