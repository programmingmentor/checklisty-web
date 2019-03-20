import React from 'react';
import { Segment, Statistic, Search } from 'semantic-ui-react';
import CreateChecklistModal from '../../create-checklist/checklist-modal';

const ListStatistic = ({ lists, setSearching, setFiltered }) => {
  const countLists = number => (number.length > 1 ? 'lists' : ' list');

  const search = (e) => {
    const value = e.target.value.toLowerCase();

    const searching = value === '';

    const filter = lists.filter(list => list.title.toLowerCase().includes(value));

    setFiltered(filter);
    setSearching(!searching);
  };

  return (
    <Segment.Group horizontal>
      <Segment basic>
        <Statistic style={{ paddingRight: '1em' }}>
          <Statistic.Value>{lists.length}</Statistic.Value>
          <Statistic.Label>{countLists(lists)}</Statistic.Label>
        </Statistic>
      </Segment>
      <Segment basic style={{ margin: 'auto' }}>
        <Search
          showNoResults={false}
          placeholder="Search lists..."
          onSearchChange={search}
        />
      </Segment>
      <Segment basic textAlign="right" style={{ margin: 'auto', border: 'none' }}>
        <CreateChecklistModal />
      </Segment>
    </Segment.Group>
  );
};

export default ListStatistic;
