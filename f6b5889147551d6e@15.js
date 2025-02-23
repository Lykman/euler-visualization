function _1(md){return(
md`# Euler's Formula Visualization – Force Graph`
)}

function _2(md){return(
md`# Euler's Formula Visualization – Force Graph  
### Визуализация графа многогранника с использованием D3.js  

Этот ноутбук демонстрирует формулу Эйлера:  
\\[
V - E + F = 2
\\]
где:  
- **V** – число вершин,  
- **E** – число рёбер,  
- **F** – число граней.  

Визуализация построена на **D3.js force-directed graph**, позволяя интерактивно перемещать вершины и наблюдать за их связями.
`
)}

function _chart(d3)
{
  const width = 800, height = 600;

  // 📌 Данные для графа куба (пример многогранника)
  const data = {
    nodes: [
      { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" },
      { id: "E" }, { id: "F" }, { id: "G" }, { id: "H" }
    ],
    links: [
      { source: "A", target: "B" }, { source: "B", target: "C" },
      { source: "C", target: "D" }, { source: "D", target: "A" },
      { source: "E", target: "F" }, { source: "F", target: "G" },
      { source: "G", target: "H" }, { source: "H", target: "E" },
      { source: "A", target: "E" }, { source: "B", target: "F" },
      { source: "C", target: "G" }, { source: "D", target: "H" }
    ]
  };

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .join("line")
      .attr("stroke-width", 2);

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
      .attr("r", 10)
      .attr("fill", "steelblue")
      .call(drag(simulation));

  node.append("title")
      .text(d => d.id);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

  return svg.node();
}


function _4(tex){return(
tex.block`V - E + F = 2
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("chart")).define("chart", ["d3"], _chart);
  main.variable(observer()).define(["tex"], _4);
  return main;
}
