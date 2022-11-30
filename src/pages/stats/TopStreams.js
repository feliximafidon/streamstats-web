import { Title1, useArrowNavigationGroup, Avatar, Badge, Tooltip, Image } from "@fluentui/react-components";
import { createColumn, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, useSort, useTable } from '@fluentui/react-components/unstable';
import React from "react";

function Tags({tag_ids, tag_data}) {
  return tag_ids?.length ? (
    <div>
      {tag_ids.map((item) => { 
        return <Badge key={item} appearance="tint" style={{marginRight: '6px'}}>{tag_data[item].name}</Badge>;
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

function TopStreams({ data }) {
  const items = data.aggregates.top_streams_following;

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
      Which of the top 1000 streams is the logged in user following? (table, /stats/top-streams)
      Which tags are shared between the user followed streams and the top 1000 streams? (table, /stats/top-streams)
    */
    <div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="px-3 mb-6 w-1/2">
          <div className="card relative px-6 py-4 card-panel">
              <div className="flex mb-4">
                  <h3 className="mr-3 text-base text-80 font-bold">
                      Top Shared Tags
                  </h3>
              </div>
              <p className="flex items-center text-4xl mb-4">
                  <Tags tag_data={data.meta.tags} tag_ids={data.aggregates.shared_tags} />
              </p>
              <div style={{marginTop: '32px'}}>
                  <p className="flex items-center text-80 font-bold">
                      <span>
                          <span>
                            Tags shared between top 1000 streams and user&rsquo;s following
                          </span>
                      </span>
                  </p>
              </div>
          </div>
        </div>
        <div className="px-3 mb-6">
          <h3 className="mr-3 text-base text-80 font-bold" style={{marginBottom: '30px'}}>
            <Title1>Streams in the Top 1000 <a href={"https://twitch.tv/" + data.user.name} target="_blank" rel="noreferrer">{data.user.name}</a> is following</Title1>
          </h3>
          <div className="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
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

export default TopStreams;