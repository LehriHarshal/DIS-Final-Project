package cis550.project

import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import org.apache.spark._
import org.apache.spark.graphx._
import org.apache.spark.rdd.RDD


object LinkGenerator {

	def main(args: Array[String]) {

		if (args.length != 4) {
			System.err.println(
			"Should be four parameters: <path/to/vertices> <path/to/edges> <path/to/output_vertices> <path/to/output_edges>")
			System.exit(1)
		}

		val conf = new SparkConf().setAppName("Link Generator")	

	    	val sc = new SparkContext(conf)

		val vertices: RDD[(VertexId, (String, String))] =
			sc.textFile(args(0)).map { line =>
				val fields = line.split(",")
				(fields(0).toLong, (fields(1).toString, fields(2).toString) )
			}

		val edges: RDD[Edge[String]] =
		      sc.textFile(args(1)).map { line =>
			val fields = line.split(",")
			Edge(fields(0).toLong, fields(1).toLong, "")
		      }

		val defaultKeyValue = ("defaultKey", "defaultValue")

		val graph = Graph(vertices, edges, defaultKeyValue)

		val cartgraph = graph.vertices.cartesian(graph.vertices)

		val filteredCartgraph = cartgraph.filter( x => x._1._2._2 == x._2._2._1 )

		val newEdges: RDD[Edge[String]] = filteredCartgraph.map( x => Edge(x._1._1, x._2._1, "") )

		val finalGraph = Graph(graph.vertices, graph.edges.union(newEdges), defaultKeyValue)

		finalGraph.vertices.map(x => x._1 + "," + x._2._1 + "," + x._2._2 ).coalesce(1,true).saveAsTextFile(args(2))

		finalGraph.edges.map(x => x.srcId + "," + x.dstId ).coalesce(1,true).saveAsTextFile(args(3))
 
	}
}
