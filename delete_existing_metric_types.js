// Fix script to delete metric types and all the related records identified by an encoded query

var metric_types_to_delete = new GlideRecord('asmt_metric_type');
metric_types_to_delete.addEncodedQuery('');
metric_types_to_delete.query();
while (metric_types_to_delete.next()) {
    var metric_id = metric_types_to_delete.getValue('sys_id');

    var metric_res = new GlideRecord('asmt_metric_result');
    metric_res.addEncodedQuery('metric.metric_type=' + metric_id);
    metric_res.query();
    metric_res.deleteMultiple();

    var results = new GlideRecord('asmt_category_result');
    results.addEncodedQuery('metric_type=' + metric_id);
    results.query();
    results.deleteMultiple();

    var questions = new GlideRecord('asmt_assessment_instance_question');
    questions.addEncodedQuery('metric.metric_type=' + metric_id);
    questions.query();
    questions.deleteMultiple();

    var instances = new GlideRecord('asmt_assessment_instance');
    instances.addEncodedQuery('metric_type=' + metric_id);
    instances.query();
    instances.deleteMultiple();

    var group = new GlideRecord('asmt_assessment');
    group.addEncodedQuery('metric_type=' + metric_id);
    group.query();
    group.deleteMultiple();

    var metric_type = new GlideRecord('asmt_metric_type');
    metric_type.get(metric_id);
    metric_type.deleteRecord();
}