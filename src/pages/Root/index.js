import { AkademikMahasiswa } from "pages/AkademikMahasiswa";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Users from "pages/Users";
import Kurikulum from "pages/Kurikulum";
import Semester from "pages/Semester";
import ManajemenRuang from "pages/ManejemenRuang";
import ProgramStudi from "pages/ProgramStudi";
import JenisNilai from "pages/JenisNilai";
import PredikatKelulusan from "pages/PredikatKelulusan";
import Jadwal from "pages/Jadwal";
import Presensi from "pages/Presensi"

import { Navigation, RootProvider } from "./hoc";
import Layout from "./Layout";
import { useRouteMatch } from "react-router";
import Helmet from "react-helmet";
import DosenPejabat from "pages/DosenPejabat";

const navigation = [
  {
    "title": "Nama Servis",
    "text": "Dashboard",
    "component": Dashboard,
    "path": "/",
    "icon": "blank",
    "exact": true
  },
  {
    "title": "Nama Servis",
    "text": "Users",
    "component": Users,
    "path": "/users",
    "icon": "blank"
  },
  {
    "title": "Nama Servis",
    "text": "Kurikulum",
    "component": Kurikulum,
    "path": "/kurikulum",
    "icon": "blank"
  },
  {
    "title": "Nama Servis",
    "text": "Semester",
    "component": Semester,
    "path": "/semester",
    "icon": "blank"
  },
  {
    "title": "Nama Servis",
    "text": "Manajemen Ruang",
    "component": ManajemenRuang,
    "path": "/manajemen-ruang",
    "icon": "blank"
  },
  {
    "title": "Dosen dan Pejabat",
    "text": "Dosen dan Pejabat",
    "component": DosenPejabat,
    "path": "/dosen-pejabat",
    "icon": "blank"
  },
  {
    "title": "Program Studi",
    "text": "Program Studi",
    "component": ProgramStudi,
    "path": "/program-studi",
    "icon": "book"
  },
  {
    "title": "Jenis Nilai",
    "text": "Jenis Nilai",
    "component": JenisNilai,
    "path": "/jenis-nilai",
    "icon": "blank"
  },
  {
    "title": "Predikat Kelulusan",
    "text": "Predikat Kelulusan",
    "component": PredikatKelulusan,
    "path": "/predikat-kelulusan",
    "icon": "blank"
  },
  {
    "title": "Jadwal",
    "text": "Jadwal",
    "component": Jadwal,
    "path": "/jadwal",
    "icon": "blank"
  },
  {
    "title": "Presensi",
    "text": "Presensi",
    "component": Presensi,
    "path": "/presensi",
    "icon": "blank"
  },
  {
    "title": "Akademik Kemahasiswaan",
    "text": "Kemahasiswaan",
    "component": AkademikMahasiswa,
    "path": "/akademik-mahasiswa",
    "icon": "user"
  },
  {
    "title": "Settings",
    "text": "Settings",
    "component": Settings,
    "path": "/settings",
    "icon": "cog"
  },
]

const Root = () => {
  const { path } = useRouteMatch();
  return (
    <RootProvider>
      <Helmet>
        <title>Dashboard - Portal Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </RootProvider>
  )
}

export default Root;