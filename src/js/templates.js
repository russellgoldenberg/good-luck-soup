this["GoodLuckSoup"] = this["GoodLuckSoup"] || {};
this["GoodLuckSoup"]["templates"] = this["GoodLuckSoup"]["templates"] || {};
this["GoodLuckSoup"]["templates"]["story-content-text"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='story-content template-text hide  story-content-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n	<h2 class='story-content-hed'>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</h2>\n	<p class='story-content-text'>"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-title-card"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='story-title-card story-title-card-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n	<div class='story-title-card-bg'></div>\n	<div class='overlay-pattern'></div>\n	<div class='vertical-align'>\n		<div class='story-title-card-text'>\n			<div class='vertical-align'>\n				<div class='story-title-card-overline'>Chapter "
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "</div>\n				<div class='story-title-card-hed'>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</div>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});