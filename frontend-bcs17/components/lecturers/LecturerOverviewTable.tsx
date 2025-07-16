import React from "react";
import { Lecturer } from "@types";

type Props = {
    lecturers: Array<Lecturer>;
    selectLecturer: (lecturer: Lecturer) => void;
};

const LecturerOverviewTable: React.FC<Props> = ({
    lecturers,
    selectLecturer,
}: Props) => {
    return (
        <>
            {lecturers && (
                <table className="text-left">
                    <thead>
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Expertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers.map((lecturer, index) => (
                            <tr
                                key={index}
                                onClick={() => selectLecturer(lecturer)}
                                role="button">
                                <td>{lecturer.user.firstName}</td>
                                <td>{lecturer.user.lastName}</td>
                                <td>{lecturer.user.email}</td>
                                <td>{lecturer.expertise}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default LecturerOverviewTable;
