import { useClient } from "components";
import { Navigation } from "pages/Root/hoc";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useRouteMatch } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile";
import { Settings } from "./Settings";

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const client = useClient();
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["students"].get(params["id"], {
          query: {
            $select: [
              "id",
              "name",
              "religion",
              "gender",
              "birth_date",
              "birth_city",
              "origin_address",
              "recent_address",
              "city",
              "postal_code",
              "phone_number",
              "email",
              "generation",
              "registration_number",
              "registration_date",
              "student_status",
              "study_program_id",
            ]
          }
        });
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <StudentContext.Provider value={data}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => {
  const student = useContext(StudentContext);
  return student;
}

const Detail = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": Profile,
      "path": `/`,
      "exact": true,
      "title": "Profile"
    },
    {
      "component": Settings,
      "path": `/settings`,
      "title": "Settings"
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Mahasiswa - Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <StudentProvider>
          <Layout />
        </StudentProvider>
      </Navigation>
    </>
  )
}

export default Detail;