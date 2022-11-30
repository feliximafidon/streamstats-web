import { Title1, useArrowNavigationGroup, Avatar, Badge, Tooltip, Image } from "@fluentui/react-components";
import { createColumn, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, useSort, useTable } from '@fluentui/react-components/unstable';
import React from "react";

function Tags({tag_ids, tag_data}) {
  return tag_ids?.length ? (
    <div>
      {tag_ids.map((item) => { 
        return <Badge appearance="tint" style={{marginRight: '6px'}}>{tag_data[item].name}</Badge>;
      })}
    </div>
  ) : '';
}

function Tip({url}) {
  //@TODO: Delayed loading for images 
  return (
    <div>
      <Image src={url.replace('{width}', 450).replace('{height}', 300)} />
    </div>
  );
}

function TopHundred({ data }) {
  const items = data.aggregates.top_hundred;

  const columns = React.useMemo(
    () => [
        createColumn({
        columnId: 'title',
        compare: (a, b) => {
          return a.title.localeCompare(b.title);
        },
        }),
        createColumn({
        columnId: 'game_name',
        compare: (a, b) => {
          return a.game_name.localeCompare(b.game_name);
        },
        }),
        createColumn({
        columnId: 'user_name',
        compare: (a, b) => {
          return a.user_name.localeCompare(b.user_name);
        },
        }),
        createColumn({
        columnId: 'viewer_count',
        compare: (a, b) => {
          return a.viewer_count > b.viewer_count;
        },
        }),
        createColumn({
        columnId: 'actions',
        }),
    ],
    [],
  );

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTable(
    {
      columns,
      items,
    },
    [useSort({ defaultSortState: { sortColumn: 'viewer_count', sortDirection: 'descending' } })],
  );

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  const headerSortProps = (columnId) => ({
    onClick: (e) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
      /*
Total number of streams by their start time (rounded to the nearest hour) (table-metric, dashboard)
How many viewers does the lowest viewer count stream that the logged in user is following need to gain in order to make it into the top 1000? (metric, dashboard)
Median number of viewers for all streams (metric, dashboard)

      */
    <div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="px-3 mb-6">
          
          <h3 class="mr-3 text-base text-80 font-bold" style={{marginBottom: '30px'}}>
            <Title1>Total Number of Streams by Start Time (includes days)</Title1>
          </h3>
          <div class="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
            <Table sortable {...keyboardNavAttr}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell {...headerSortProps('title')} colSpan={3}><strong>Stream Title</strong></TableHeaderCell>
                  <TableHeaderCell {...headerSortProps('game_name')}><strong>Game Name</strong></TableHeaderCell>
                  <TableHeaderCell {...headerSortProps('user_name')}><strong>User</strong></TableHeaderCell>
                  <TableHeaderCell {...headerSortProps('viewer_count')}><strong>Viewer Count</strong></TableHeaderCell>
                  <TableHeaderCell><strong>Tags</strong></TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(({ item }) => (
                  <TableRow key={item.id}>
                    <TableCell colSpan={3}>
                      <TableCellLayout>
                        <Tooltip withArrow content=<Tip url={item.thumbnail_url} /> relationship="label">
                          <Avatar image={{ src: item.thumbnail_url.replace('{width}', 48).replace('{height}', 48) }} style={{verticalAlign: 'top', display: 'inline-block'}} />
                        </Tooltip>
                        <span style={{display: "inline-block", width: 'calc(100% - 43px)', marginLeft: '6px'}}>{item.title ? item.title : '-'}</span>
                      </TableCellLayout>
                    </TableCell>
                    <TableCell>
                      <TableCellLayout>{item.game_name ? item.game_name : '-'}</TableCellLayout>
                    </TableCell>
                    <TableCell>
                      <TableCellLayout>{item.user_name}</TableCellLayout>
                    </TableCell>
                    <TableCell>
                      <TableCellLayout>{item.viewer_count.toLocaleString('en')}</TableCellLayout>
                    </TableCell>
                    <TableCell>
                      <TableCellLayout>
                        <Tags tag_data={data.meta.tags} tag_ids={item.tag_ids} />
                      </TableCellLayout>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHundred;