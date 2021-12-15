import { Classes, HTMLTable } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["employees"].get(params.id);
        setItem(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id]);

  return (
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <h4 className={Classes.HEADING}>Ringkasan</h4>
        {item &&
          <HTMLTable striped={true}>
            <tbody>
              {[
                ["NIP", item["nip"]],
                ["Nama Lengkap", `${item["front_degree"] || ""}${item["name"]}${item["back_degree"] || ""}`],
                ["NIK", item["id_number"]],
                ["Tempat Lahir", item["birth_city"]],
                ["Tanggal Lahir", item["birth_date"]],
                ["Jenis Kelamin", item["gender"]],
                ["Golongan Darah", item["blood_type"]],
                ["Agama", item["religion"]],
                ["Status Nikah", item["merried_status"]],
                ["Alamat", item["home_address"]],
                ["Negara", item["country"]],
                ["Kabupaten/Kota", item["city"]],
                ["Nomor Telepon", item["phone_number"]],
                ["Email", item["email"]]
              ].map((value, idx) => (
                <tr key={value[0]}>
                  <td>
                    <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                  </td>
                  <td>{value[1]}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>}
      </Box>
      <Divider vertical={true} />
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          {item && `${item["front_degree"] || ""}${item["name"]}${item["back_degree"] || ""}`}
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          {item && item["nip"]}
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout;