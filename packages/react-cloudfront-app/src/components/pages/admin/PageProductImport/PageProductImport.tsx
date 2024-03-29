import ProductsTable from '~/components/pages/admin/PageProductImport/components/ProductsTable';
import CSVFileImport from '~/components/pages/admin/PageProductImport/components/CSVFileImport';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { apiRoutes } from '~/constants/apiRoutes';

export default function PageProductImport() {
  return (
    <Box py={3}>
      <Box mb={2} display="flex" justifyContent="space-between">
        <CSVFileImport url={apiRoutes.productFileImport()} title="Import Products CSV" />
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ alignSelf: 'end' }}
          component={Link}
          to={'/admin/product-form'}
        >
          Create product
        </Button>
      </Box>
      <ProductsTable />
    </Box>
  );
}
