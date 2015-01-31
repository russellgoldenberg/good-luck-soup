this["GoodLuckSoup"] = this["GoodLuckSoup"] || {};
this["GoodLuckSoup"]["templates"] = this["GoodLuckSoup"]["templates"] || {};
this["GoodLuckSoup"]["templates"]["story-content"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='story-content story-content-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n	<div class='story-content-template'></div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-audio-img"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='template-text-img'>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<p class='story-content-img'><img src='assets/img/story/"
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "'></p>\n	<div class='story-content-audio'>\n		<audio controls='controls' preload='preload'>\n			<source src='assets/audio/"
    + escapeExpression(((helper = (helper = helpers.audio || (depth0 != null ? depth0.audio : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"audio","hash":{},"data":data}) : helper)))
    + ".mp3' type='audio/mp3'>\n			<source src='assets/audio/"
    + escapeExpression(((helper = (helper = helpers.audio || (depth0 != null ? depth0.audio : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"audio","hash":{},"data":data}) : helper)))
    + ".ogg' type='audio/ogg'>\n		</audio>\n	</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-text-img"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class='template-text-img'>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<p class='story-content-img'><img src='assets/img/story/"
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "'></p>\n	<div class='story-content-text'>";
  stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-text"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class='template-text'>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<div class='story-content-text'>";
  stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-video"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='template-video'>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<div class='story-content-video'>\n		<iframe src=\"//player.vimeo.com/video/"
    + escapeExpression(((helper = (helper = helpers.video || (depth0 != null ? depth0.video : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"video","hash":{},"data":data}) : helper)))
    + "?color=ffffff&title=0&byline=0&portrait=0\" width=\"720\" height=\"405\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n	</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-title-card"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='story-title-card story-title-card-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'></div>";
},"useData":true});