import { Title1, PresenceBadgeStatus, useArrowNavigationGroup, Avatar } from "@fluentui/react-components";
import { createColumn, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, useSort, useTable } from '@fluentui/react-components/unstable';
import React from "react";

function TableDateHour ({items, headers, orderBy}) {  
  const datehour = (datehour) => {
    return new Date(datehour + ':00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' });
  }

  const time = (time) => {
    let ampm = 'am';
    let varTime = parseInt(time);
    if (! varTime) {
      varTime = 12;
    } else if (varTime > 12) {
      varTime = varTime - 12;
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    return varTime + ampm;
  }

  const columns = React.useMemo(
    () => [
        createColumn({
        columnId: 'datehour',
        compare: (a, b) => {
            if (a.type === 'datetime') {
              return (new Date(a.datehour + ':00')) > (new Date(b.datehour + ':00'));
            } else {
              return parseInt(a.datehour) > parseInt(b.datehour);
            }
        },
        }),
        createColumn({
        columnId: 'count',
        compare: (a, b) => {
            return a.count > b.count;
        },
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
    [useSort({ defaultSortState: orderBy })],
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
    <Table sortable {...keyboardNavAttr}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps('datehour')}><strong>{headers.datehour}</strong></TableHeaderCell>
          <TableHeaderCell {...headerSortProps('count')}><strong>{headers.count}</strong></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.datehour + item.count}>
            <TableCell>{item.type === 'datetime' ? datehour(item.datehour) : time(item.datehour)}</TableCell>
            <TableCell>
              <TableCellLayout>{item.count}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Dashboard({ data }) {
  let saphphire_user = 'the least followed viewer count'; //@TODO: Get the name of the user
  const diffTopOneThousand = (diff) => {
    if (diff === null) {
      return '-';
    } else if (diff < 0) {
      
    } else {
      return diff;
    }
  }
  

  return (
      /*
Total number of streams by their start time (rounded to the nearest hour) (table-metric, dashboard)
How many viewers does the lowest viewer count stream that the logged in user is following need to gain in order to make it into the top 1000? (metric, dashboard)
Median number of viewers for all streams (metric, dashboard)

      */
      <div>
          <div className="px-3 mb-6">
            <h3 className="mr-3 text-base text-80 font-bold" style={{marginBottom: '30px'}}>
              <Title1>Dashboard</Title1>
            </h3>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
              <div className="px-3 mb-6 w-1/2">
                  <div className="card relative px-6 py-4 card-panel">
                      <div className="flex mb-4">
                          <h3 className="mr-3 text-base text-80 font-bold">
                              Sapphire Index
                          </h3>
                      </div>
                      <p className="flex items-center text-4xl mb-4">
                          <Title1>{diffTopOneThousand(data.aggregates.lowest_following_diff_top_1000)}</Title1>
                      </p>
                      <div>
                          <p className="flex items-center text-80 font-bold">
                              <span>
                                  <span>
                                      Number of viewers <a href={'https://twitch.tv/' + saphphire_user} target="_blank" rel="noreferrer">{saphphire_user}</a> needs to make it to top 1000
                                  </span>
                              </span>
                          </p>
                      </div>
                  </div>
              </div>
              <div className="px-3 mb-6 w-1/2">
                  <div className="card relative px-6 py-4 card-panel">
                      <div className="flex mb-4">
                          <h3 className="mr-3 text-base text-80 font-bold">
                              Median Viewers
                          </h3>
                      </div>
                      <p className="flex items-center text-4xl mb-4">
                          <Title1>{data.aggregates.median_viewer_count ? data.aggregates.median_viewer_count : 0}</Title1>
                      </p>
                      <div>
                          <p className="flex items-center text-80 font-bold">
                              <span>
                                  <span>
                                    Median number of viewers for all streams
                                  </span>
                              </span>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="px-3 mb-6 w-1/2">
                
                <h3 className="mr-3 text-base text-80 font-bold">
                  Total Number of Streams by Start Time (includes days)
                </h3>
                <div className="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
                  <TableDateHour 
                    items={data.aggregates.streams_by_time} 
                    headers={{datehour: 'Hour of Day', count: 'Number of Streams (of ' + data.meta.stream_count + ')'}} 
                    orderBy={{ sortColumn: 'datehour', sortDirection: 'descending' }}
                  />
                </div>
              </div>
              <div className="px-3 mb-6 w-1/2">
                
                <h3 className="mr-3 text-base text-80 font-bold">
                  Total Number of Streams by Start Time (time only)
                </h3>
                <div className="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
                  <TableDateHour 
                    items={data.aggregates.streams_by_time_only} 
                    headers={{datehour: 'Hour of Day', count: 'Number of Streams (of ' + data.meta.stream_count + ')'}} 
                    orderBy={{ sortColumn: 'datehour', sortDirection: 'ascending' }}
                  />  
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}

export default Dashboard;