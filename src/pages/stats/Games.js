import { Title1, PresenceBadgeStatus, useArrowNavigationGroup, Avatar } from "@fluentui/react-components";
import { createColumn, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, useSort, useTable } from '@fluentui/react-components/unstable';
import React from "react";

function TableGame ({items, headers, orderBy}) {
  const columns = React.useMemo(
    () => [
        createColumn({
          columnId: 'game_id',
          compare: (a, b) => {
              return parseInt(a.game_id) > parseInt(b.game_id);
          },
        }),
        createColumn({
          columnId: 'name',
          compare: (a, b) => {
              return a.name.localeCompare(b.name);
          },
        }),
        createColumn({
          columnId: 'count',
          compare: (a, b) => {
              return parseInt(a.count) > parseInt(b.count);
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
          <TableHeaderCell {...headerSortProps('game_id')}><strong>{headers.game_id}</strong></TableHeaderCell>
          <TableHeaderCell {...headerSortProps('name')}><strong>{headers.name}</strong></TableHeaderCell>
          <TableHeaderCell {...headerSortProps('count')}><strong>{headers.count}</strong></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.game_id}>
            <TableCell>{item.game_id.length ? item.game_id : '-'}</TableCell>
            <TableCell>{item.name.length ? item.name : '(Unknown)'}</TableCell>
            <TableCell>{item.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Games({ data }) {
  const objToArray = (data, gameData) => {
    let items = [];

    Object.map(data, function(value, key) {
      items.push({game_id: key, name: gameData[key], count: value});
    });

    return items;
  }

  return (
    /*
      Total number of streams for each game (table, /stats/game)
      Top games by viewer count for each game (table, /stats/game)
    */
    <div>
        <div className="px-3 mb-6">
          <h3 className="mr-3 text-base text-80 font-bold" style={{marginBottom: '30px'}}>
            <Title1>Game Stats</Title1>
          </h3>
        </div>
        <div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="px-3 mb-6 w-1/2">
              
              <h3 className="mr-3 text-base text-80 font-bold">
                Total Number of Streams for each Game
              </h3>
              <div className="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
                <TableGame 
                  items={objToArray(data.aggregates.games_total_streams, data.meta.games)} 
                  headers={{game_id: 'Game ID', name: 'Name of Game', count: 'Number of Streams'}} 
                  orderBy={{ sortColumn: 'count', sortDirection: 'descending' }}
                />
              </div>
            </div>
            <div className="px-3 mb-6 w-1/2">
              
              <h3 className="mr-3 text-base text-80 font-bold">
                Total Viewer Count for each Game
              </h3>
              <div className="card relative px-6 py-4 card-panel" style={{ height: 'initial' }}>
                <TableGame 
                  items={objToArray(data.aggregates.games_viewer_count, data.meta.games)} 
                  headers={{game_id: 'Game ID', name: 'Name of Game', count: 'Viewer Count'}} 
                  orderBy={{ sortColumn: 'count', sortDirection: 'descending' }}
                />  
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Games;