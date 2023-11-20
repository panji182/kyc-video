'use client';

import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import styles from '@/components/template/DashboardPage/index.styles';

function findStartNode(
  scrollTop: any,
  nodePositions: number[],
  itemCount: number
) {
  let startRange = 0;
  let endRange = itemCount - 1;
  while (endRange !== startRange) {
    const middle = Math.floor((endRange - startRange) / 2 + startRange);

    if (
      nodePositions[middle] <= scrollTop &&
      nodePositions[middle + 1] > scrollTop
    ) {
      return middle;
    }

    if (middle === startRange) {
      // edge case - start and end range are consecutive
      return endRange;
    } else {
      if (nodePositions[middle] <= scrollTop) {
        startRange = middle;
      } else {
        endRange = middle;
      }
    }
  }
  return itemCount;
}

function findEndNode(
  nodePositions: number[],
  startNode: number,
  itemCount: number,
  height: number
) {
  let endNode;
  for (endNode = startNode; endNode < itemCount; endNode++) {
    if (nodePositions[endNode] > nodePositions[startNode] + height) {
      return endNode;
    }
  }
  return endNode;
}

type VirtualScrollProps = {
  Item: any;
  itemCount: number;
  height: number;
  heightRowVirtual: number;
  renderAhead: number;
  // eslint-disable-next-line no-unused-vars
  onClickDetail: (id: string) => void;
  datas: any[];
  showDataPerRow: number;
};

// VirtualScroll component
const VirtualScroll = ({
  Item,
  itemCount,
  height,
  heightRowVirtual,
  renderAhead = 10,
  onClickDetail,
  datas = [],
  showDataPerRow,
}: VirtualScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const animationFrame = useRef<number>(0);

  const handleScroll = useCallback((e: any) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById('scrollContainer');
    scrollContainer && setScrollTop(scrollContainer.scrollTop);
  }, []);

  const childPositions = useMemo(() => {
    const results = [0];
    for (let i = 1; i < itemCount; i++) {
      results.push(results[i - 1] + heightRowVirtual);
    }
    return results;
  }, [itemCount, heightRowVirtual]);

  const totalHeight = childPositions[itemCount - 1] + heightRowVirtual;

  const firstVisibleNode = useMemo(
    () => findStartNode(scrollTop, childPositions, itemCount),
    [scrollTop, childPositions, itemCount]
  );

  const startNode = Math.max(0, firstVisibleNode - renderAhead);

  const lastVisibleNode = useMemo(
    () => findEndNode(childPositions, firstVisibleNode, itemCount, height),
    [childPositions, firstVisibleNode, itemCount, height]
  );
  const endNode = Math.min(itemCount - 1, lastVisibleNode + renderAhead);
  const visibleNodeCount = endNode - startNode + 1;
  const offsetY = childPositions[startNode];
  const visibleChildren = useMemo(
    () =>
      new Array(visibleNodeCount).fill(null).map((_, index) => {
        const dataPerRowStartOffset = (index + startNode) * showDataPerRow;
        const dataPerRowEndOffset = dataPerRowStartOffset + showDataPerRow;
        const rowData = JSON.stringify(
          datas.slice(dataPerRowStartOffset, dataPerRowEndOffset)
        );
        return (
          <Item
            key={index + startNode}
            onClickDetail={onClickDetail}
            rowData={rowData}
          />
        );
      }),
    [startNode, visibleNodeCount, Item, datas, showDataPerRow]
  );

  return (
    <Box
      id="scrollContainer"
      sx={{ height, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <Box
        className="viewport"
        sx={{
          overflow: 'hidden',
          willChange: 'transform',
          height: totalHeight,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            willChange: 'transform',
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={theme => ({
              [theme.breakpoints.up('lg')]: {
                ...styles.widthChangeRealtimeXl,
              },
            })}
          >
            {visibleChildren}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(VirtualScroll);
